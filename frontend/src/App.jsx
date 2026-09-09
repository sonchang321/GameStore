import {Routes, Route, Link} from 'react-router'
import GameListPage from './pages/GameListPage.jsx'
import GameDetailPage from './pages/GameDetailPage.jsx'
import './App.css'

function App() {
    const storeName = 'GameStore'

    return (
        <>
            <header className="site-header">
                <strong className="site-logo">{storeName}</strong>
            </header>

            <Routes>
                <Route path="/" element={<GameListPage/>}/>
                <Route path="/games/:id" element={<GameDetailPage/>}/>
                <Route
                    path="*"
                    element={
                        <main className="store">
                            <p>페이지를 찾을 수 없습니다.</p>
                            <Link to="/">게임 목록으로</Link>
                        </main>
                    }
                />
            </Routes>
        </>
    )
}

export default App