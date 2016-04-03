# International Trade Puzzle
See [1-international-trade.md](1-international-trade.md) for puzzle definition.

# Considerations

## Transactions Filter Stream

The code could have looked cleaner if i'd imported Transactions into an array using the same pattern I used for rates and then just filtered asynchronously. However, I wanted to experiment with the async behaviour of streams and build something that would scale to any volume of transactions.

## Private Functions

The public rates interface only needs to be the following.

* withUsdRates
* findRate
* usdAmount

However, I have left other functions public in order to test the logic around calculating the cross rates. Maybe these functions should be moved to another file?