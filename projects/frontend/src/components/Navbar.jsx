import React from 'react'
import clsx from 'clsx';

function Navbar({ brand = "Navbar", items = [] }) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">{brand}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {items.map((item, index) => (
                            <li key={index} className={clsx('nav-item', { active: item.active })}>
                                <a 
                                    className={clsx('nav-link', { disabled: item.disabled })}
                                    href={item.href || '#'}
                                    tabIndex={item.disabled ? -1 : undefined}
                                    aria-disabled={item.disabled}
                                >
                                    {item.text}
                                    {item.active && <span className="sr-only">(actuel)</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
