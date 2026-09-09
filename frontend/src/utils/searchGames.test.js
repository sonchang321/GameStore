import test from 'node:test'
import assert from 'node:assert/strict'
import { searchGames } from "./searchGames.js";

test('공백과 대소문자를 무시하고 제목 일부로 검색한다', () => {
    const games = [
        { id: 1, title: 'Elden Ring', price: 64800},
        { id: 2, title: 'Cyberpunk 2077', price: 66000},
    ]

    const result = searchGames(games, ' CYBER ')

    assert.deepEqual(result, [
        { id: 2, title: 'Cyberpunk 2077', price: 66000},
    ])
})

test('빈 검색어이면 전체 게임을 반환한다', () => {
    const games = [
        { id: 1, title: 'Elden Ring', price: 64800 },
        { id: 2, title: 'Cyberpunk 2077', price: 66000 },
    ]

    const result = searchGames(games, '')

    assert.deepEqual(result, games)
})

test('일치하는 게임이 없으면 빈 배열을 반환한다', () => {
    const games = [
        { id: 1, title: 'Elden Ring', price: 64800},
        { id: 2, title: 'Cyberpunk 2077', price: 66000},
    ]

    const result = searchGames(games, 'Mincraft')

    assert.deepEqual(result,[])
})

test('게임 목록이 비어 있으면 빈 배열을 반환한다', () => {
    const result = searchGames([],'Cyber')

    assert.deepEqual(result,[])
})

test('검색해도 원본 게임 목록과 내용은 변경되지 않는다', () => {
    const games = [
        { id: 1, title: 'Elden Ring', price: 64800 },
        { id: 2, title: 'Cyberpunk 2077', price: 66000 },
    ]

    searchGames(games, 'Cyber')

    assert.deepEqual(games, [
        { id: 1, title: 'Elden Ring', price: 64800 },
        { id: 2, title: 'Cyberpunk 2077', price: 66000 },
    ])
})