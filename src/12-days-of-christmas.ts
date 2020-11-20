
const DaysTuple = [
    'Twelfth',
    'Eleventh',
    'Tenth',
    'Ninth',
    'Eighth',
    'Seventh',
    'Sixth',
    'Fifth',
    'Fourth',
    'Third',
    'Second',
    'First',
] as const;
type DaysTupleType = typeof DaysTuple
type Day = DaysTupleType[number];

const GiftsTuple = [
    "12 Drummers Drumming",
    "11 Pipers Piping",
    "10 Lords a-Leaping",
    "9 Ladies Dancing",
    "8 Maids a-Milking",
    "7 Swans a-Swimming",
    "6 Geese a-Laying",
    "5 Gold Rings",
    "4 Calling Birds",
    "3 French Hens",
    "2 Turtle Doves, and",
    "A partridge in a pear tree",
] as const;
type GiftsTupleType = typeof GiftsTuple;
type Gift = GiftsTupleType[number];

type FirstLine<D extends Day> = `On the ${D} day of Christmas my true love sent to me,`

type DayVerse<D extends Day, G extends readonly [...Gift[]]> =
    [FirstLine<D>, ...G]

type Tail<T> =
    T extends readonly [infer U, ...infer T]
        ? T
        : [];

type GiftsForDay<D extends readonly [...Day[]], G extends readonly [...Gift[]]> =
    D["length"] extends 0
        ? []
        : [G[0], ...GiftsForDay<Tail<D>, Tail<G>>]
       
export type TwelveDaysOfChristmas<D extends readonly [...Day[]] = DaysTupleType, G extends readonly [...Gift[]] = GiftsTupleType> =
    D["length"] extends 0
    ? []
    // @ts-ignore
    : [...TwelveDaysOfChristmas<Tail<D>, Tail<G>>, DayVerse<D[0], GiftsForDay<D, G>>]