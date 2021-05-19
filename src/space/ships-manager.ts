let spaceships = 3;

export function count_ships():number {
  return spaceships;
}

export function add_ships(n:number):void {
  if (spaceships + n < 10) {
    spaceships += n;
  } else {
    throw new Error("max 10 ships");
  }
}

export default function describe():string {
  return "Space ships manager is a useful module...";
}

export const sum
    = (...a: number[]) =>
      a.reduce((acc, val) => acc + val, 0);