import React, {useState, useEffect} from "react";
import countryData from "./../utils/sources.json";
import Card from "./../components/Card";

function HandleCard () {
    const [state, setState] = useState({
        loading: false,
        apiUrl: "https://newsapi.org/v2/",
        filters: {
            country: "us",
            category: "business"
        },
        country: [...countryData.country],
        category: [...countryData.category],
        data: []
    });

    const handleChange = element => {
        const newState = {...state};

        Object.keys(state.filters).map(parameter => {
            if (element.target.id === parameter) {
                newState.filters[parameter] = element.target.value;
            }
        });

        setState(newState);
    };

    useEffect(() => {
        fetch(`${state.apiUrl}top-headlines?country=${state.filters.country}&category=${state.filters.category}&apikey=${process.env.REACT_APP_APIKEY}`)
        .then(data => data.json())
        .then(dataParsed => {
            const newState = {...state};

            newState.loading = true;
            newState.data = [...dataParsed.articles];

            setState(newState);
        })
        .catch(err => err.message)
    }, [state.filters.country, state.filters.category]);

    return (
        <>
            <section className="container filter mt-5">
                <div className="row">
                    <div className="input-group mb-3 col-4">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Country</label>
                        </div>
                        <select className="custom-select" id="country" onChange={e => handleChange(e)}>
                            {
                                state.country.map(item => {
                                    return <option 
                                                value={item.value} 
                                                key={item.value}>{item.content}
                                            </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3 col-4">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                        </div>
                        <select className="custom-select" id="category" onChange={e => handleChange(e)}>
                            {
                                state.category.map((item, i) => {
                                    return <option
                                        value={item}
                                        key={i}>{item}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </section>
            <section className="container handle--card mt-5">
                <div className="row">
                    <div className="col-12 d-flex flex-wrap">
                        {
                            state.loading ? state.data.map((el,i) => <Card data={el} key={i}/>)
                            : <p>Loading data...</p>
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default HandleCard;