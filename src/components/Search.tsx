


function SearchComponents() {
    const category = [
        {
            id: 1,
            name: 'all',
            isActive: true
        },
        {
            id: 2,
            name: 'economy',
            isActive: false
        },
        {
            id: 3,
            name: 'Sedan',
            isActive: false
        },
        {
            id: 4,
            name: 'Suv',
            isActive: false
        },
        {
            id: 5,
            name: 'Mini Bus',
            isActive: false
        },
    ]
    return (
        <div className="flex flex-col">
            <input 
                placeholder="Search all cbars here ......"
                className="px-4 py-2 border border-gray-400 bg-white text-gray-400"
            />
            <div className="flex flex-row mt-5 space-x-6">
                {
                category.map((item) => {
                    return(
                        <div key={item.id} className={ item.isActive ?  `bg-black px-3 py-1 gap-5 mr-2` : 'px-3 py-1 gap-5 border border-gray-400 mr-2' }>
                            <p className={item.isActive ? 'text-white text-lg' : 'text-black text-lg'}>{item.name}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
}

export default SearchComponents;