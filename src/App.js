import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from "./components/Header/Header";
import NewsList from "./pages/NewsList/NewsList";
import NotFound from "./components/NotFound/NotFound";

import { api } from "./api";

class App extends React.PureComponent {

    state = {
        sources: null
    };

    componentDidMount() {
        api.getSources()
            .then(sources => this.setState({ sources }))
    }

    render() {

        const { sources } = this.state;

        return (
            <div className="App">
                <Header sources={sources}/>
                <Switch>
                    <Redirect exact from='/' to="/lastnews"/>
                    <Route exact path={'/search/:q'} render={(props) => (
                        <NewsList
                            header={'Searched Results'}
                            {...props}
                        />
                    )}/>
                    <Route exact path={'/lastnews'} render={(props) => (
                        <NewsList
                            header={'Last News'}
                            {...props}
                        />
                    )}/>
                    {sources && sources.map((item, i) => <Route key={i} exact path={`/${item.id}`} render={(props) => (
                        <NewsList
                            header={item.name}
                            {...props}
                        />
                    )}/>)}
                    <Route exact path={'/404'} component={NotFound}/>
                    <Redirect from='*' to='/404'/>
                </Switch>
            </div>
        );
    }
}

export default App;
