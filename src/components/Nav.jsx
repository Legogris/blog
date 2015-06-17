'use strict';
const React = require('react');
const NavLink = require('flux-router-component').NavLink;

const Nav = React.createClass({
    getDefaultProps: function () {
        return {
            selected: 'home',
            links: {}
        };
    },
    render: function() {
        let selected = this.props.selected;
        let links = this.props.links;

        let linkHTML = Object.keys(links).map((name) => {
            let className = '';
            let link = links[name];
            if (selected.url === link.path) {
                className = 'pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} href={link.path}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <ul className={'pure-menu pure-menu-open pure-menu-'+this.props.alignment}>
                {linkHTML}
            </ul>
        );
    }
});

module.exports = Nav;
