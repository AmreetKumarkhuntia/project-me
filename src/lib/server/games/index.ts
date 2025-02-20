import type { Game, SteamGame } from "$generated/types";

export function castToGameFromSteamGame(steamGames: SteamGame[]): Game[] {
  const games: Game[] = [];
  steamGames.map((steamGame) => {
    const game: Game = {
      name: steamGame.name,
      id: String(steamGame.appid),
      playTime: steamGame.playtime_forever,
      lastPlayed: steamGame.rtime_last_played,
      iconUrl: steamGame.img_icon_url,
      achievements: [],
    };
    games.push(game);
  });

  return games;
}
