import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../config'
const baseUrl = REACT_APP_BACKEND_URL + '/api/games'

export const validatePreMatch = (players, users, user) => {
  if (players.length <= 1) {
    throw Error('Choose at least 2 players')
  }
  if (!players.includes(user.username)) {
    throw Error('you must participate in game')
  }

  const usernames = users.map((u) => u.username)
  const checkedUsernames = []
  for (const player of players) {
    if (!usernames.includes(player)) {
      throw Error(`username ${player} does not exist`)
    }
    if (checkedUsernames.includes(player)) {
      throw Error(`duplicate username: ${player}`)
    }
    checkedUsernames.push(player)
  }
  return true
}

export const validateScores = (scores) => {
  scores.forEach((round, roundIndex) => {
    round.forEach((score, scoreIndex) => {
      const s = Number(score)
      if (isNaN(s)) {
        throw Error(
          `Score in round ${roundIndex + 1} player ${
            scoreIndex + 1
          } must be a number`
        )
      }
    })
  })
}

export const getWinnersOfTheRound = (round) => {
  const highestScore = round.reduce((a, b) => Math.max(a, b), -Infinity)
  const results = []
  round.forEach((score) => {
    if (score === highestScore) {
      results.push(1)
    } else {
      results.push(0)
    }
  })
  return results
}

export const winListFromRound = (
  scores,
  startingRoundIndex,
  players,
  previousWins
) => {
  let results = [...previousWins]
  for (
    let roundIndex = startingRoundIndex;
    roundIndex < scores.length;
    roundIndex++
  ) {
    const roundResults = getWinnersOfTheRound(scores[roundIndex])
    if (roundIndex === 0) {
      roundResults.forEach((r, i) => (results[roundIndex][i] = r))
    } else {
      roundResults.forEach(
        (r, i) => (results[roundIndex][i] = r + results[roundIndex - 1][i])
      )
    }
  }
  return results
}

const checkWinners = (scores, players) => {
  const initWins = scores.map((round) => [players.map((p) => 0)])
  const allRounds = winListFromRound(scores, 0, players, initWins)
  const lastRound = allRounds.slice(allRounds.length - 1)[0]
  const highestWinCount = lastRound.reduce((a, b) => Math.max(a, b), -Infinity)
  const winners = []
  players.forEach((p, index) => {
    if (lastRound[index] === highestWinCount) {
      winners.push(index)
    }
  })
  return winners
}

export const sendMatch = async (players, users, scores, sport, user) => {
  const ids = []
  for (const p of players) {
    for (const u of users) {
      if (p === u.username) {
        ids.push(u._id)
      }
    }
  }
  const game = {
    players: ids,
    rounds: scores,
    sport: sport,
  }
  const res = await axios.post(baseUrl, game, {
    headers: {
      'content-type': 'application/json',
      Authorization: user.token,
    },
  })
}
