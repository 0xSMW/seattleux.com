import {
  getAllCompanies,
  getAllFirms,
  getAllGroups,
} from "../src/lib/content/loaders";
import { isStale } from "../src/lib/content/stale";

async function main() {
  const [firms, companies, groups] = await Promise.all([
    getAllFirms(),
    getAllCompanies(),
    getAllGroups(),
  ]);

  const staleFirms = firms.filter((f) => isStale(f.frontmatter.lastVerified));
  const staleCompanies = companies.filter((c) =>
    isStale(c.frontmatter.lastVerified),
  );
  const staleGroups = groups.filter((g) => isStale(g.frontmatter.lastVerified));

  console.log("Stale listings (>180 days):");
  console.log({
    agencies: staleFirms.map((f) => f.slug),
    teams: staleCompanies.map((c) => c.slug),
    groups: staleGroups.map((g) => g.slug),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
