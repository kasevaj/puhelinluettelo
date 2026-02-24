const Person = ({ person, handleDeletion }) => {
    return (
        <li>
            {person.name} {person.number} <button onClick={handleDeletion}>{'delete'}</button>
        </li>
    )
}

export default Person