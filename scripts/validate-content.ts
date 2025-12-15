import {
  getAllCompanies,
  getAllEvents,
  getAllFirms,
  getAllGroups,
  getAllGuides,
  getAllPlaybooks,
} from "../src/lib/content/loaders";

async function main() {
  const [firms, companies, guides, playbooks, events, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGuides({ includeDrafts: true }),
    getAllPlaybooks({ includeDrafts: true }),
    getAllEvents(),
    getAllGroups(),
  ]);

  const counts = {
    agencies: firms.length,
    teams: companies.length,
    guides: guides.length,
    playbooks: playbooks.length,
    events: events.length,
    groups: groups.length,
  };

  console.log("Content validated:", counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
