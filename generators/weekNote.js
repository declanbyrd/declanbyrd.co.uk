// @ts-check

const fs = require('fs');
const { DateTime } = require('luxon');
const nowReading = require('../src/data/now/reading.json');
const nowWatching = require('../src/data/now/watching');

const WEEK_NOTE_DIR = 'src/content/weekNotes';

const getDateOrdinal = (day) => {
  const th = 'th';
  const rd = 'rd';
  const nd = 'nd';
  const st = 'st';

  if (day === 11 || day === 12 || day === 13) return th;

  let lastDigit = day.toString().slice(-1);

  switch (lastDigit) {
    case '1':
      return st;
    case '2':
      return nd;
    case '3':
      return rd;
    default:
      return th;
  }
};

const getNextMonday = (date) => {
  const daysToAdd = (7 - date.weekday + 1) % 7;
  return date.plus({ day: daysToAdd === 0 ? 7 : daysToAdd });
};

const createPageFrontmatter = (weekNumber, year, date) => {
  const nextMonday = getNextMonday(date);
  const publishDate = nextMonday
    .set({ hour: 8, minute: 30, second: 0, millisecond: 0 })
    .toISO();
  const title = `${year} Week Notes - Week ${weekNumber}`;
  const description = `Notes for the ${weekNumber}${getDateOrdinal(
    weekNumber
  )} week of ${year}.`;

  return `---\ntitle: "${title}"\ndate: ${publishDate}\ndescription: "${description}"\n---\n`;
};

const populateReading = () => {
  return `## What I've been reading:\n\n- No progress made with [${nowReading.title} by ${nowReading.authors}](/reading#now) this week.\n`;
};

const populateWatching = async () => {
  const mediaDiet = await nowWatching();
  if (mediaDiet && mediaDiet.length) {
    const list = mediaDiet.map((media) => {
      return `- [${media.nowString}](${media.tmdbUrl}).`;
    });
    return `## What I've been watching:\n\n${list.join('\n')}`;
  }
  return `## What I've been watching:\n\n- Nothing watched this week`;
};

const populateChangelog = () => {
  return `## What has changed on this site:\n\n- No changes this week.\n`;
};

const writeTemplate = async () => {
  const now = DateTime.now();
  const { weekNumber, year } = now;
  const sections = [
    createPageFrontmatter(weekNumber, year, now),
    populateChangelog(),
    populateReading(),
    await populateWatching(),
  ];
  const template = sections.join('\n');
  fs.writeFile(
    `${WEEK_NOTE_DIR}/${year}/week${weekNumber}.md`,
    template,
    (err) => {
      if (err) throw err;
      console.log(
        `Created template for ${WEEK_NOTE_DIR}/${year}/week${weekNumber}.md`
      );
    }
  );
};

writeTemplate();
