import random
import string


def generate_random_uppercase_string(length: int) -> str:
    if length < 1:
        raise ValueError("Length must be a positive integer.")

    random_string = "".join(random.choices(string.ascii_uppercase, k=length))
    return random_string
