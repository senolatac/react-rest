import React from 'react';
import { Link } from 'react-router-dom';


class NotFound extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                          <span className="display-1">
                            404
                          </span>
                        <div className="mb-4 lead">
                            Oops! We can't seem to find the page you are looking for.
                        </div>
                        <Link to="/login" className="btn btn-link">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}


export { NotFound };
