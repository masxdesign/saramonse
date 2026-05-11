#!/usr/bin/env python3
import re
import sys
from pathlib import Path


def upsert_prop(block: str, prop_name: str, prop_value: str) -> str:
    pattern = re.compile(rf'^\s*{re.escape(prop_name)}="[^"]*"\s*$', re.MULTILINE)
    replacement = f'  {prop_name}="{prop_value}"'
    if pattern.search(block):
        return pattern.sub(replacement, block, count=1)

    lines = block.splitlines()
    insert_at = len(lines) - 1
    for idx, line in enumerate(lines):
        if line.strip() == ">":
            insert_at = idx
            break
    lines.insert(insert_at, replacement)
    return "\n".join(lines)


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: update-videohero-props.py <astro-file> <base-name>")
        print("Example: update-videohero-props.py src/pages/services/eyes.astro eyes-hero")
        return 1

    astro_path = Path(sys.argv[1])
    base_name = sys.argv[2]

    if not astro_path.is_file():
        print(f"Error: file not found: {astro_path}")
        return 1

    content = astro_path.read_text(encoding="utf-8")

    match = re.search(r"<VideoHeroLayout\b[\s\S]*?\n>", content)
    if not match:
        print("Error: could not find a VideoHeroLayout opening block")
        return 1

    block = match.group(0)
    block = upsert_prop(block, "videoWebmSrc", f"/assets/{base_name}.small.webm?t=1")
    block = upsert_prop(block, "videoMp4Src", f"/assets/{base_name}.small.mp4?t=1")
    block = upsert_prop(block, "videoPoster", f"/assets/{base_name}-poster.webp")

    updated = content[: match.start()] + block + content[match.end() :]
    astro_path.write_text(updated, encoding="utf-8")

    print(f"Updated {astro_path}")
    print(f'videoWebmSrc="/assets/{base_name}.small.webm?t=1"')
    print(f'videoMp4Src="/assets/{base_name}.small.mp4?t=1"')
    print(f'videoPoster="/assets/{base_name}-poster.webp"')
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
