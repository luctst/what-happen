import React, {useState, useEffect} from "react";
import countryData from "./../utils/sources.json";
import Card from "./../components/Card";

function HandleCard () {
    const [state, setState] = useState({
        loading: false,
        apiUrl: "https://newsapi.org/v2/",
        filters: {
            country: "us"
        },
        country: [...countryData.country],
        data: []
    });

    const handleChange = element => {
        if (state.filters.country === element.target.value) {
            return alert("Articles already fetch from "+ state.filters.country.toUpperCase());
        }

        const newState = {...state};
        newState.filters.country = element.target.value;

        fetch(`${state.apiUrl}top-headlines?country=${element.target.value}&apikey=${process.env.REACT_APP_APIKEY}`)
        .then(data => data.json())
        .then(dataParsed => {
            newState.data = [...dataParsed.articles];

            setState(newState);
        });
    };

    useEffect(() => {
        fetch(`${state.apiUrl}top-headlines?country=us&apikey=${process.env.REACT_APP_APIKEY}`)
        .then(data => data.json())
        .then(dataParsed => {
            const newState = {...state};

            newState.loading = !newState.loading;
            newState.data = [...dataParsed.articles];

            setState(newState);
        })
        .catch(err => err.message)
    }, []);

    return (
        <>
            <section className="container filter mt-5">
                <div className="row">
                    <div className="input-group mb-3 col-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Country</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={e => handleChange(e)}>
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