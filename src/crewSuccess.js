import { CATEGORY_NAMES } from './crewmateOptions';

// How likely the crew is to finish its mission, from 0 to 100.
//   Roles:  up to 60 points, 15 for each role that at least one crewmate has
//   Speed:  up to 25 points, based on the crew's average speed out of 5 mph
//   Size:   up to 15 points, 3 for each crewmate, up to 5 crewmates
export function crewSuccess(crewmates) {
  const rolesFilled = CATEGORY_NAMES.filter((role) =>
    crewmates.some((c) => c.category === role),
  );
  const missingRoles = CATEGORY_NAMES.filter((role) => !rolesFilled.includes(role));

  const averageSpeed =
    crewmates.reduce((sum, c) => sum + Number(c.speed), 0) / crewmates.length;

  const rolePoints = rolesFilled.length * 15;
  const speedPoints = Math.round((averageSpeed / 5) * 25);
  const sizePoints = Math.min(crewmates.length, 5) * 3;
  const score = rolePoints + speedPoints + sizePoints;

  // The tier decides how the crewmate list looks
  let tier, label;
  if (score >= 75) {
    tier = "ready";
    label = "Ready for launch";
  } else if (score >= 45) {
    tier = "shaky";
    label = "Shaky, but it might work";
  } else {
    tier = "doomed";
    label = "This mission is doomed";
  }

  // One tip for raising the score
  let tip;
  if (missingRoles.length > 0) {
    const role = missingRoles[0];
    const article = /^[AEIOU]/.test(role) ? "an" : "a";
    tip = `Add ${article} ${role} to fill an empty role.`;
  } else if (crewmates.length < 5) {
    tip = "Every role is filled! Add more crewmates to grow the crew.";
  } else if (averageSpeed < 5) {
    tip = "Faster crewmates would raise the score even more.";
  } else {
    tip = "A perfect crew. Nothing can stop you now.";
  }

  return { score, tier, label, tip, rolePoints, speedPoints, sizePoints };
}
