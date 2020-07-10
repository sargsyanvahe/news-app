import React from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import ModalContainer from "../ModalContainer";
import ContactForm from "./ContactForm";

import Logo from '../../assets/Logo.png'
import './Header.css'

class Header extends React.PureComponent {

    state = {
        openedNavbar: false,
        searchValue: '',
        contactForm: false
    };

    handleBurgerClick = () => {
        this.setState(state => ({
            openedNavbar: !state.openedNavbar
        }))
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        const { searchValue } = this.state;
        if (searchValue) {
            this.props.history.push(`/search/${searchValue}`);
            this.setState({ searchValue: '', openedNavbar: false })
        }
    };

    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value })
    };

    handleCloseForm = () => {
        this.setState({ contactForm: false })
    };

    render() {

        const { openedNavbar, searchValue, contactForm } = this.state;
        const { sources } = this.props;

        return (
            <>
                <div className='header'>
                    <Link onClick={()=>this.setState({openedNavbar: false})} to={'/'}>
                        <img src={Logo} alt=""/>
                    </Link>
                    <div className={`navbar-items ${openedNavbar ? 'opened' : ''}`}>
                        <SearchBar handleChange={this.handleSearchChange}
                                   handleSubmit={this.handleSearchSubmit}
                                   value={searchValue}
                        />
                        {sources && sources.map((item, i) =>
                            <NavLink onClick={() => this.setState({ openedNavbar: false })} key={i}
                                     activeClassName='selected' to={`/${item.id}`}>
                                {item.name}
                            </NavLink>
                        )}
                        <button onClick={() => this.setState({ contactForm: true })} className='btn'>
                            Contact us
                        </button>
                    </div>
                    <div className={`burger ${openedNavbar ? 'opened-burger' : ''}`}
                         onClick={this.handleBurgerClick}>
                        <span className='first-span'/>
                        <span className='second-span'/>
                    </div>
                </div>
                {contactForm && <ModalContainer><ContactForm handleCloseForm={this.handleCloseForm}/></ModalContainer>}
            </>
        )
    }
};

export default withRouter(Header);