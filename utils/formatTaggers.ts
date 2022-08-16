export const formatTaggers = (taggers: Array<string>, users: any) =>
  taggers
    .slice(0, 3)
    .reduce(
      (acc: string, tagger: string, i: number) =>
        acc.concat(
          `${users[tagger]?.name || tagger.slice(0, 6)}${
            taggers.length > i + 1 ? ", " : ""
          }`
        ),
      ""
    )
    .concat(
      `${
        taggers.length > 3
          ? `and ${taggers.length - 3} other${taggers.length > 4 ? "s" : ""}.`
          : ""
      }`
    );
