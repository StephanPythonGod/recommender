import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import cabin from './assets/img/portfolio/cabin.png';


function Product(props){
    if (props.in_basket) {
        return (
            <div class="col-md-6 col-lg-4 mb-5" onClick={() => props.onClick(props.product)} key={props.product}>
                <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div class="portfolio-item-caption-n d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-n-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src={cabin} alt="..." />
                </div>
            </div>
            )
    } else {
        return (
            <div class="col-md-6 col-lg-4 mb-5" onClick={() => props.onClick(props.product)} key={props.product}>
                <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src={cabin} alt="..." />
                </div>
            </div>
            )
    }

}


function Recommended(props) {
    return (
        <div class="col-md-6 col-lg-4 mb-5" key={props.product + "_recommendation"}>
        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
            <img class="img-fluid" src={cabin} alt="..." />
        </div>
    </div>
    )
}





class Website extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product_list : [
                "vegetables",
                "juice",
                "beef",
                "individual meals",
                "flour",
                "shampoo",
                "cereals",
                "poultry",
                "pasta",
                "ketchup",
                "lunch meat",
                "eggs",
                "dinner rolls",
                "ice cream",
                "fruits",
                "cheeses",
                "soap",
                "butter",
                "sugar",
                "bagels",
                "aluminum foil",
                "coffee/tea",
                "dishwashing liquid/detergent",
                "yogurt",
                "laundry detergent",
                "hand soap",
                "waffles",
                "milk",
                "mixes",
                "paper towels",
                "pork",
                "sandwich bags",
                "sandwich loaves",
                "soda",
                "spaghetti sauce",
                "toilet paper",
                "tortillas",
                "all- purpose"
            ],
            basket : [],
            recommendation : []
        }
    }

    handleClick(i) {
        var basket = this.state.basket.slice();

        console.log(i)

        if (basket.includes(i)){
            const index = basket.indexOf(i)
            if (index > -1){
                basket.splice(index, 1);
            }
        }else{
            basket.push(i);
        }


        // this.setState({
        //     product_list : this.state.product_list.slice(),
        //     basket : basket
        // })

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        basket = basket.filter(onlyUnique)

        

        this.setState({basket: basket}, function () {
            this.getRecommendation();
            console.log(this.state.basket)
        });

    }

    getRecommendation() {
        const basket = this.state.basket
        const data = JSON.stringify({products: basket})


        const requestOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
              },
            body: data
        };
        fetch('http://localhost:5000/recommend/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ recommendation: data.slice(0,6) }, function () { this.displayRecommendation()}));
    }

    displayRecommendation() {
        this.forceUpdate();
        console.log(this.state.recommendation)
    }

    render() {

        
        const product_list = this.state.product_list.slice();
        const basket = this.state.basket.slice()

        var catalog = {}


        for (let product of product_list) {
            catalog[product] = basket.includes(product)
        }




        const Catalog = ({catalog}) => (
            <>
                {Object.entries(catalog).map(([key, value]) => {
                    return <Product in_basket={value} key={key} product={key} onClick= {i => this.handleClick(i)}/>
                })}
            </>
        );


        // const Catalog = ({product_list}) => (
        //     <>
        //       {product_list.map(product => (
        //         <Product key = {product} product={product} onClick = {i => this.handleClick(i)}/>
        //       ))}
        //     </>
        //   ); 



        const recommendations = this.state.recommendation.slice();
        const Recommendations = ({recommendations}) => (
            <>
              {recommendations.map(reco => (
                <Recommended key = {reco} product={reco}/>
                ))}
            </>
        );


        return (
        <div>
            <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                <img class="masthead-avatar mb-5" src="assets/img/avataaars.svg" alt="..." />
                <h1 class="masthead-heading text-uppercase mb-0">E-Commerce Recommender Demo</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <p class="masthead-subheading font-weight-light mb-0">by Green Software Solutions</p>
            </div>
            </header>
            
            <section class="page-section portfolio" id="portfolio">
            <div class="container">
                <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Products</h2>
                <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <div class="row justify-content-center">


                    {/* <Catalog product_list={product_list}/> */}
                    <Catalog catalog={catalog} />


                </div>
                <section class="page-section bg-primary text-white mb-0" id="recommendations">
                    <div class="container">
                        <h2 class="page-section-heading text-center text-uppercase text-white">Recommendations</h2>
                        <div class="divider-custom divider-light">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                            <div class="divider-custom-line"></div>
                        </div>


                    <h4 class="text-uppercase text-center mb-0">What we would recommend for you</h4>

                    <div class="divider-custom divider-light">
                    </div>

                    <div class="row justify-content-center">


                        <Recommendations recommendations={recommendations}/>

                    </div>

                    </div>
                </section>

            </div>
            </section>
        
        </div>

        )
    }
}

// ========================================

ReactDOM.render(
    <Website />,
    document.getElementById('root')
  );
  