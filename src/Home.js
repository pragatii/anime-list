import React, {useState} from "react";
import {connect} from "react-redux";
import {searchAction, searchMoreAction} from "./store/actions";
import AnimeCard from "./AnimeCard";

const Home = ({state, search, searchMore}) => {
    console.log(state);
    const [query, setQuery] = useState();

    const handleClick = () => {
        search(query);
    };

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={e => {
                    e.preventDefault();
                    handleClick();
                }} className="search-bar">
                    <input type="text" onChange={e => setQuery(e.target.value)}/>
                    <div className='spacer'/>
                    <button type={'submit'}>
                        <b>Go</b>
                    </button>
                </form>
            </header>
            <main>
                {
                    state.error
                        ? 'Some error occurred, please try again.'
                        : (state.isLoading
                        ? 'Loading...'
                        : <div className={'main-content'}>
                            <div className={'content'}>
                                {state.entities.map(en => <AnimeCard key={en.mal_id} title={en.title}
                                                                     image={en.image_url}/>)}
                            </div>
                            {
                                state.isLoadingMore
                                &&
                                <p>Loading...</p>
                            }
                            {
                                !!state.entities.length
                                &&
                                !state.isLoadingMore
                                &&
                                <button className={'load-more'} onClick={e => searchMore(query)}>Load More</button>
                            }
                        </div>)
                }
            </main>
        </div>
    );
}

export default connect(
    state => ({
        state: state.animes
    }),
    dispatch => ({
        search: payload => dispatch(searchAction(payload)),
        searchMore: payload => dispatch(searchMoreAction(payload))
    }))(Home);
