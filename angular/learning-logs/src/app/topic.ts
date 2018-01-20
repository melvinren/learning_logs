export class TopicList {
    count: number;
    topics: Topic[];
}

export class Topic {
    _id: string;
    text: string;
    date: string;
    update_date: string;
    entries: Entry[];
}

export class Entry {
    text: string;
    date: string;
}