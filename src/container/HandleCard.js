import React, {useState, useEffect} from "react";
import countryData from "./../utils/sources.json";
import Card from "./../components/Card";

function HandleCard () {
    const [state, setState] = useState({
        loading: false,
        apiUrl: "https://newsapi.org/v2/",
        filters: {
            country: {
                value: "us",
                data: [...countryData.country]
            },
            category: {
                value: "business",
                data: [...countryData.category]
            },
        },
        data: []
    });

    const handleChange = element => {
        const newState = {...state};

        newState.filters[element.target.id].value = element.target.value;

        setState(newState);
    };

    useEffect(() => {
        const urlToFetch = new URL(`${state.apiUrl}top-headlines?apikey=${process.env.REACT_APP_APIKEY}`);

        Object.keys(state.filters).map(filter => urlToFetch.searchParams.append(filter, state.filters[filter].value));

        fetch(urlToFetch.toString())
        .then(data => data.json())
        .then(dataParsed => {
            const newState = {...state};

            newState.loading = true;
            newState.data = [...dataParsed.articles];

            setState(newState);
        })
        .catch(err => err.message)
    }, [
        state.filters.country.value, 
        state.filters.category.value
    ]);

    return (
        <>
            <section className="container filter mt-5">
                <div className="row">
                    {
                        Object.keys(state.filters).map(filter => {
                            return (
                                <>
                                    <div className="input-group mb-3 col-4">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">{filter}</label>
                                        </div>
                                        <select className="custom-select" id={filter} onChange={e => handleChange(e)}>
                                            {
                                                state.filters[filter].data.map(item => {
                                                    if (typeof item === "object") {    
                                                        return <option
                                                            value={item.value}
                                                            key={item.value}>{item.content}
                                                        </option>
                                                    }

                                                    return <option value={item} key={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </>
                            );
                        })
                    }
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