# Terraforming Mars — Deuteranopia Edition

This is a personal fork of [terraforming-mars/terraforming-mars](https://github.com/terraforming-mars/terraforming-mars) with color adjustments for **deuteranopia** (red-green color blindness). Player colors and board icons are remapped to be distinguishable without relying on red-green contrast.

**Docker Hub:** [`gugatec/terraforming-mars_deuteranopia-colors`](https://hub.docker.com/r/gugatec/terraforming-mars_deuteranopia-colors)

> **Breaking change — Postgres 14.5 → 18.4:** The database image has been upgraded. Postgres 18 stores data in a version-specific subdirectory, so the volume mount has moved from `/var/lib/postgresql/data` to `/var/lib/postgresql`. If you have an existing database from the previous version, a dump/restore is required before starting the new stack.

---

## What's changed from upstream

Only 3 files differ from the original repository:

| File | Change |
|---|---|
| `assets/board_icons.png` | Recolored board icons |
| `assets/colony_ship.png` | Recolored colony ship |
| `src/styles/variables.less` | All player colors + text colors adjusted |

### Player color adjustments

| Player | This fork | Upstream |
|---|---|---|
| Red | `rgb(185, 56, 2)` | `rgb(153, 17, 0)` |
| Yellow | `rgb(192, 192, 0)` | `rgb(170, 170, 0)` |
| Green | `rgb(0, 158, 95)` | `rgb(0, 153, 0)` |
| Black | `rgb(47, 45, 95)` — dark indigo | `rgb(170, 170, 170)` — grey |
| Blue | `rgb(22, 159, 204)` | `rgb(0, 102, 255)` |
| Purple | `rgb(124, 66, 131)` | `rgb(140, 0, 255)` |
| Orange | `rgb(230, 159, 0)` | `rgb(236, 113, 12)` |
| Pink | `rgb(251, 218, 212)` | `rgb(245, 116, 187)` |

---

## Running with Docker

The recommended way to run this fork is via Docker Compose with PostgreSQL.

A ready-to-use `compose.yml` and `.env.docker-compose` are included in this repository.

**Setup:**
```bash
# 1. Copy the env template to .env (gitignored) and fill in your values
cp .env.docker-compose .env
$EDITOR .env

# 2. Start the stack
docker compose up -d
```

The app will be available at **http://localhost:`HOST_PORT`** (default: http://localhost:8080).

The admin interface is available at **http://localhost:`HOST_PORT`/game?id=`SERVER_ID`**.

**`compose.yml` — what's included:**

| Service | Image | Notes |
|---|---|---|
| `terraforming-mars` | `gugatec/terraforming-mars_deuteranopia-colors:latest` | App, port 8080 |
| `mars-postgres` | `postgres:18` | Data persisted to `./postgresdb/` |

> **Note (Postgres 18+):** The Docker image stores data under a version-specific subdirectory, so the volume is mounted at `/var/lib/postgresql` rather than `/var/lib/postgresql/data`. If migrating from an older Postgres version, a dump/restore is required before swapping the image.

**`.env` variables** (see `.env.docker-compose`):

| Variable | Description |
|---|---|
| `HOST_PORT` | Host port the app is exposed on (container always uses 8080) |
| `POSTGRES_USER` | PostgreSQL username |
| `POSTGRES_PASSWORD` | PostgreSQL password |
| `POSTGRES_DB` | PostgreSQL database name |
| `SERVER_ID` | Unique identifier for this server instance |

**Stop / update:**
```bash
docker compose down
docker compose pull && docker compose up -d   # pulls latest image then restarts
```

---

## Syncing with upstream

```bash
git fetch upstream
git reset --hard upstream/main
# restore the 3 modified files, then:
git add assets/board_icons.png assets/colony_ship.png src/styles/variables.less
git commit -m "Deuteranopia color adjustments: board icons, colony ship, CSS variables"
git push origin main --force
```

---

---
---

# Original README (upstream)

> The content below is from the original [terraforming-mars/terraforming-mars](https://github.com/terraforming-mars/terraforming-mars) repository. Some sections (Heroku, YunoHost, community Discord) refer to the upstream project and may not apply to this fork.

---

# <a name="README"> Terraforming Mars Open-source

<div align="center">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_corporateEra.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_venus.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_colonies.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_turmoil.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_prelude.png">
</div>
<div align="center">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_ares.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_community.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_promo.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_agendas.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_themoon.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_pathfinders.png">
  <img src="https://raw.githubusercontent.com/bafolts/terraforming-mars/main/assets/expansion_icons/expansion_icon_escapeVelocity.png">
</div>

This is an open-source online implementation of the great board game Terraforming mars. **It is not affiliated
with FryxGames, Asmodee Digital or Steam in any way.**

**Note**: This project has no affiliation with "Rebalanced Mars", whose authors have refused to open-source their code.
We believe this is both a violation of our GPL3 license, and also of the spirit of collaboration that this project tries
to foster. Note that any new features you see on this repo made available on that server are without our permission.

**Buy The Board Game**

The board game is great and this repository highly recommends [purchasing it](https://www.amazon.com/Stronghold-Games-6005SG-Terraforming-Board/dp/B01GSYA4K2) for personal use.

## ⬤ I want to join the community!
[Join us over on Discord!](https://discord.gg/afeyggbN6Y) *(Note: this is the upstream project's Discord, not specific to this fork.)*

## ⬤ I want to play!
There's an instance available at https://terraforming-mars.herokuapp.com/. *(Note: this is the upstream instance without deuteranopia colors. To play with the color adjustments, use the Docker image above.)*

It's generally reliable, but read more below.

There's also this excellent
[YouTube playlist](https://youtube.com/playlist?list=PLCGE78n9vCqhhmRe9YCrRh2GLNMPB_3j1) focused on tutorials custom for this app.

NOTE: This site is restarted daily. A multiplayer game will remain available for 15 days, after which it will be flushed from the database.
Unfinished solo games are flushed after one day. We continue to make stability and scalability improvements in step with growth and popularity,
but to make sure your game remains, we highly recommended to host your own web server.

## ⬤ I want to learn how to play
There are far too many good tutorials online. [Here are the rulebooks, though.](https://github.com/terraforming-mars/terraforming-mars/wiki/Rulebooks)

## ⬤ I want to run a copy of the server locally
Check out our [Local setup wiki page](https://github.com/bafolts/terraforming-mars/wiki/Local-Setup)

Honestly, it's really simple.

## ⬤ I want to run a copy of the server on Heroku
Check out our [Heroku setup wiki page](https://github.com/bafolts/terraforming-mars/wiki/Heroku-Setup)

(As of 2022-11-28, Heroku no longer has a free tier. However, it is still our recommended way to deploy,
as they're the clearest instructions.)

## ⬤ I want to run a copy of the server on Docker
Check out our [Docker setup wiki page](https://github.com/bafolts/terraforming-mars/wiki/Docker-Setup)

(Warning, this is not aggressively supported, though some people are on the Discord.)

## ⬤ I want to run a copy on a YunoHost server
[![Install Terraforming Mars with YunoHost](https://install-app.yunohost.org/install-with-yunohost.svg)](https://install-app.yunohost.org/?app=terraforming-mars)

The code for the Yunohost Terraforming-Mars package is in this [GitHub repo](https://github.com/YunoHost-Apps/terraforming-mars_ynh)

(Warning, this is not specifically supported.)

## ⬤ I want to report a bug or feature request
This fork does not track issues. For bugs related to the game logic or upstream features, please use the [upstream issue tracker](https://github.com/bafolts/terraforming-mars/issues/new). For color/accessibility issues specific to this fork, feel free to open an issue here.

## ⬤ I want to contribute to development
This is a personal fork and does not actively accept contributions. For the upstream project, see the [contribution guide](https://github.com/terraforming-mars/terraforming-mars/blob/main/CONTRIBUTING.md) and [local development setup](https://github.com/terraforming-mars/terraforming-mars/wiki/Local-Setup).

## ⬤ I want to win!
Me too, pal. Me too.

## ✨ Contributors ✨

Thanks goes to these wonderful people *(contributors to the upstream project)*:

<table border="0">
  <tdata>
    <tr>
      <td><img src="https://avatars1.githubusercontent.com/u/2707843?v=3" width="50px;" alt=""/></td>
      <td><a href="https://github.com/bafolts"><b>Brian Folts</b></a>: All the things</td>
    </tr>
    <tr>
       <td><img src="https://avatars1.githubusercontent.com/u/56086992?v=3" width="50px;" alt=""/></td>
       <td><a href="https://github.com/vincentneko"><b>Vincent Moreau</b></a>: Venus, Prelude, Hellas & Elysium, Colonies, Turmoil</td>
    </tr>
    <tr>
      <td><img src="https://avatars2.githubusercontent.com/u/394311?v=3" width="50px;" alt=""/></td>
      <td><a href="https://github.com/alrusdi"><b>alrusdi</b></a>: Front End, internationalization</td>
    </tr>
    <tr>
      <td><img src="https://avatars3.githubusercontent.com/u/6917565?s=460&v=4" width="50px;" alt=""/></td>
      <td><a href="https://github.com/ssimeonoff"><b>Simeon Simeonov</b></a>: UX, cards and Colonies design</td>
    </tr>
    <tr>
      <td><img src="https://avatars0.githubusercontent.com/u/806950?v=3" width="50px;" alt=""/></td>
      <td><b><a href="https://github.com/pierrehilbert">Pierre Hilbert</b></a>: Turmoil and helps with the things</td>
    </tr>
    <tr>
      <td><img src="https://avatars1.githubusercontent.com/u/2408094?s=460&v=4" width="50px;" alt=""/></td>
      <td><b><a href="https://github.com/nwai90">nwai90</b></a>: Community and Political Agendas fan-made expansions, and helps with the things</td>
    </tr>
    <tr>
      <td><img src="https://avatars1.githubusercontent.com/u/10995145?s=460&v=4" width="50px;" alt=""/></td>
      <td><b><a href="https://github.com/pocc">Pocc</b></a>: He did that one thing one time</td>
    </tr>
    <tr>
      <td><img src="https://avatars1.githubusercontent.com/u/413481?s=460&v=4" width="50px;" alt=""/></td>
      <td><b><a href="https://github.com/kberg">Robert Konigsberg</b></a>: Fan expansions: Ares, The Moon, Pathfinders, Underworld. Prelude 2. Infrastructure cleanup, code reviews, two opinions too many.</a> </td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/836179?s=460&v=4" width="50px;" alt=""/></td>
      <td><a href="https://github.com/chosta"><b>chosta</b></a>: Front end and back end</a> </td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/5318258?s=460&v=4" width="50px;" alt=""/><br />
      <td><a href="https://github.com/Lynesth"><b>Lynesth</b></a>: Help with the things</a> </td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/15874357?s=460&v=4" width="50px;" alt=""/><br />
      <td><a href="https://github.com/derornos"><b>푸른이(derornos)</b></a>: 한국어화 옮긴이(Korean translator)<br>&emsp;<a href="mailto:derornos@gmail.com">메일(email): derornos@gmail.com</a> / <a href="https://open.kakao.com/me/derornos">카카오톡(KakaoTalk, Messenger): link</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/105346182?s=460&v=4" width="50px;" alt=""/><br />
      <td><a href="https://github.com/Borbarad2"><b>Borbarad</b></a>: Translation</a> </td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/2050250?s=460&v=4" width="50px;" alt=""/><br />
      <td><a href="https://github.com/d-little"><b>d-little</b></a>: CEOs</a> </td>
    </tr>
  </tdata>
</table>


## LICENSE

GPLv3

Russian Prototype font: https://fonts-online.ru/fonts/prototype-rus-daymarius (copyright 2001, free for personal use)
Polish Prototype font: https://www.gry-planszowe.pl/viewtopic.php?p=1489006#p1489006 (copyright 2001, free for personal use)
Baord Game Icons: http://www.kenney.nl/  (Creative Commons Zero, CC0)
