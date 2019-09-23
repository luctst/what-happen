import React from "react";

function Card(data) {
    return (
        <article className="card col-4 mb-3 rounded" style={{ padding: 0}}>
            <img className="card-img-top" src={data.data.urlToImage} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{data.data.title}</h5>
                    <p className="card-text" style={{fontSize: ".8em"}}>{data.data.description}</p>
                    <blockquote className="blockquote mb-0">
                        <footer className="blockquote-footer mb-2">Written by <cite title="Source Title">{data.data.author}</cite></footer>
                    </blockquote>
                    <a href={data.data.url} target="_blank" className="btn btn-primary">Read on {data.data.source.name}</a>
                </div>
        </article>
    );
}

export default Card;