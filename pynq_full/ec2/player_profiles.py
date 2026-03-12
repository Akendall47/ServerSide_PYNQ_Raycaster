import re


def sanitize_username(username: str) -> str:
    return (username or "").strip()


def normalize_player_key(value: str) -> str:
    cleaned = sanitize_username(value).lower()
    cleaned = re.sub(r"[^a-z0-9]+", "-", cleaned)
    cleaned = cleaned.strip("-")
    return cleaned[:48]


def controller_key_for_addr(addr) -> str:
    if isinstance(addr, tuple) and addr:
        host = str(addr[0])
    else:
        host = str(addr or "")
    key = normalize_player_key(host)
    return f"controller-{key}" if key else "controller-unknown"


def build_player_identity(username: str, addr) -> dict:
    clean_username = sanitize_username(username)
    controller_key = controller_key_for_addr(addr)
    normalized_username = normalize_player_key(clean_username)
    if clean_username:
        return {
            "username": clean_username,
            "display_name": clean_username,
            "profile_key": normalized_username or controller_key,
            "controller_key": controller_key,
            "identity_source": "username",
        }
    return {
        "username": "",
        "display_name": controller_key,
        "profile_key": controller_key,
        "controller_key": controller_key,
        "identity_source": "controller",
    }
