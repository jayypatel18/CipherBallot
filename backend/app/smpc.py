# app/smpc.py
from mpyc.runtime import mpc

async def aggregate_votes(votes):
    """
    Aggregate votes using SMPC.
    """
    await mpc.start()

    secnum = mpc.SecInt()  # Secure integer type
    secure_votes = [secnum(1 if vote == "Yes" else 0) for vote in votes]

    total_yes = mpc.sum(secure_votes)
    result = await mpc.output(total_yes)

    await mpc.shutdown()
    return result