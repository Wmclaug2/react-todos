import React from 'react';
import {partial} from '../../lib/utils';

export const TodoItem = (props) => {
    const handleToggle = partial(props.handleToggle, props.id);
    return (
    <li>
        <input onChange={handleToggle}
        defaultChecked={props.isComplete}
        type='checkbox' /> 
        {props.name}
    </li>)
}

TodoItem.propTypes ={
    name: React.PropTypes.string.isRequired,
    isComplete: React.PropTypes.bool,
    id: React.PropTypes.number.isRequired
}