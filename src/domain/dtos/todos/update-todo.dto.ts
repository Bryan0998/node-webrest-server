


export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) {}

    get values() {
        const returnObj: {[key:string]: any} = {}

        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create ( props: {[key:string]: any}): [string?, UpdateTodoDto?] {
        const { id, text, completedAt} = props;

        if ( !id || isNaN(id) ) {
            return ['id must be valid number'];
        }

        if ( completedAt ){
            const newCompletedAt = new Date( completedAt );
            if ( newCompletedAt.toString() === 'Ivalid Date'){
                return ['completedAt must be a valid date'];
            }
        }


        if (!text) return ['Text property is required', undefined];


        return[undefined, new UpdateTodoDto(text)];
    }
}