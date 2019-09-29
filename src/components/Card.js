import React from "react";

const styleCard = {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0,0,0,.12)",
    flex: "0 0 30%",
    marginRight: "20px"
}

const styleImg = {
    width: "35px",
    height: "35px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
}

const styleP = {
    fontSize: "14px",
    marginBottom: 0,
    color: "#6e7583"
}

function Card(data) {
    const day = new Date(data.data.publishedAt).getDate();
    const month = new Date(data.data.publishedAt).getMonth();
    const year = new Date(data.data.publishedAt).getFullYear();

    return (
        <article className="col-4 mb-3 rounded" style={styleCard}>
            <div className="author" style={{marginBottom: "15px"}}>
                <a href={data.data.url} 
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{textDecoration: "none", display: "flex", alignItems: "center"}}>
                    <div className="img">
                        <img src={data.data.urlToImage} style={styleImg}/>
                    </div>
                    <div className="author">
                        <h5 style={{ marginBottom: "2px", fontWeight: 600, color: "#6c7583", fontSize: "10px"}}>{data.data.author}</h5>
                    </div>
                </a>
            </div>
            <div className="header" style={{marginBottom: "15px"}}>
                <h5 style={{fontSize: "19px", marginBottom: "5px"}}>
                    <a 
                        href={data.data.url} 
                        rel="noopener noreferrer" 
                        target="_blank">
                            <span style={{fontWeight: 700}}>{data.data.title}</span>
                    </a>
                </h5>
                <p className="small text-muted">Posted - {day}/{month}/{year}</p>
            </div>
            <div className="body">
                <p style={styleP}>{data.data.description}</p>
                {/* {
                    data.data.description.length >= 198 ?
                        <p style={styleP}>{data.data.description.slice(198, data.data.description.length)}</p>
                    : <p style={styleP}>{data.data.description}</p>
                } */}
            </div>
        </article>
    );
}

export default Card;