# Considerations

## Transactions Filter Stream

The code could have looked cleaner if i'd imported Transactions into an array using the same pattern I used for rates and then just filtered asynchronously. However, I wanted to experiment with the async behaviour of streams and build something that would scale to any volume of transactions.