import { defineStore } from 'pinia'
import type { Url } from 'url'

 interface History {
  name: string,
  result: string,
 difficulty: string,
}

export const usePlayersStore = defineStore('players', {
    state: () => ({ 
        history: [] as History[],
        username: '' as string,
        difficulty: 'easy' as string || null,
        hero: "https://www.freepnglogos.com/uploads/halo-png/transparent-jorge-halo-nation-character-22.png" as string
     }),
    getters: {
      getHistory: (state) => state.history,
      getUserName: (state) => state.username,
      getDifficulty: (state) => state.difficulty,
      getHero: (state) => state.hero
    },
    actions: {
      addToHistory(newObj: History) {
        this.history.push(newObj)
      },
      setUserName(newUsername: string) {
        this.username = newUsername
      },
      setDifficulty(difficulty: string | null ) {
        this.difficulty = difficulty
      },
      setHero(hero: string ) {
        this.hero = hero
      },
    },
    // persist: {
    //   enabled: true
    // }
  })