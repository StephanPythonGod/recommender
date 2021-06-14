import numpy as np
import pandas as pd
import random
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn import model_selection
from sklearn.metrics.pairwise import cosine_similarity

from datetime import date


class recommender:
    
    def __init__(self):
        self.df = None
        self.load_df()
        self.create_sparsity_matrix()
        pass

    def load_df(self):
        #Load the csv to df
        self.df = pd.read_csv("./data/dataset_group.csv", header = None)
        self.df.columns = ["Date", "Customer_ID", "Product"]
        pass

    def create_sparsity_matrix(self):
        #create the sparsity matrix for SVM

        #encoding
        user_enc = LabelEncoder()

        self.df['Customer_ID'] = user_enc.fit_transform(self.df['Customer_ID'].values)
        self.n_users = self.df['Customer_ID'].nunique()

        self.item_enc = LabelEncoder()
        self.df["Product"] = self.item_enc.fit_transform(self.df["Product"].values)
        self.n_products = self.df["Product"].nunique()

        #add purchased and drop date
        self.df['Purchased'] = 1

        try:
            self.df.drop(columns="Date")
        except:
            pass

        #create sparsity_matrix
        self.sparsity_matrix = pd.pivot_table(self.df,values='Purchased',index='Customer_ID',columns='Product').fillna(0)

        pass

    def encoding(self, datapoint):
        #encode datapoint from api
        return self.item_enc.transform(datapoint)

    def decoding(self, prediction):
        #decode prediction for api return
        return self.item_enc.inverse_transform(prediction)

    def save_new_datapoint(self, datapoint):
        #save datapoint to csv
        self.load_df()

        nr = self.df.iloc[-1,1] + 1

        for i in datapoint:
            self.df = self.df.append({'Date': date.today(), "Customer_ID" : nr, "Product" : i},ignore_index=True)

        self.df.to_csv("./data/dataset_group.csv")

        self.create_sparsity_matrix()
        pass

    def predict(self, datapoint, k = 5):
        #predict an input vector
        #INPUT : np.array.shape = (1, 38)
        similarity = cosine_similarity(self.sparsity_matrix, datapoint)
        index_list = np.flip(np.argsort(np.transpose(similarity)))
        similar_users = []
        for i in range(k):
            similar_users.append(self.sparsity_matrix.loc[index_list[0][i]].to_numpy())
        similar_products = np.sum(np.array(similar_users),axis=0) 
        for i in range(len(datapoint[0])):
            if datapoint[0][i] == 1:
                similar_products[i] = 0

        return np.flip(np.argsort(similar_products))