export default function SearchDropdown(props: any) {
    return (
        <div className='suggestion-list'>
            <ul>
                {props.cityList.map((item: any, index: number) => {
                    return (
                        <li key={index} onClick={() => { props.handleClick(item.name) }}>
                            {item.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}