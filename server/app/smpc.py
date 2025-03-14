from mpyc.runtime import mpc

async def aggregate_votes(votes):
    """
    Aggregate votes using SMPC for multiple options.
    """
    await mpc.start()  # Start the MPyC runtime

    # Define secure types
    secnum = mpc.SecInt()  # Secure integer type

    # Convert votes to secure integers for each option
    options = ['Option1', 'Option2', 'Option3']  # List of possible options
    secure_votes = {option: [] for option in options}

    for vote in votes:
        for option in options:
            # Convert each vote to a secure integer (1 if selected, 0 otherwise)
            secure_votes[option].append(secnum(1 if vote == option else 0))

    # Sum the secure votes for each option
    aggregated = {}
    for option in options:
        aggregated[option] = mpc.sum(secure_votes[option])

    # Reveal the results
    results = {}
    for option in options:
        results[option] = await mpc.output(aggregated[option])

    await mpc.shutdown()  # Shut down the MPyC runtime
    return results