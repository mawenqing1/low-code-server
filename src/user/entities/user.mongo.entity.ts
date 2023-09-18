import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column('text')
    name: string
}
