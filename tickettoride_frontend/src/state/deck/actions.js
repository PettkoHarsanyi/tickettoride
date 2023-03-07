export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK"
export const REMOVE_CARD_FROM_DECK = "REMOVE_CARD_FROM_DECK"
export const REPLACE_DECK = "REPLACE_DECK"
export const INITIALIZE_DECK = "INITIALIZE_DECK"

export const addCardToDeck = (train,pos) => ({
  type: ADD_CARD_TO_DECK,
  payload: {train,pos}
})

export const removeCardFromDec = (train,pos) => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: {train,pos}
})

export const replaceDeck = (deck) => ({
  type: REPLACE_DECK,
  payload: deck
})

export const initializeDeck = () => ({
  type: INITIALIZE_DECK,
})