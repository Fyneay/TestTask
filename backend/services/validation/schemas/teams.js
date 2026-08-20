const createTeamSchema = {
    name: {
        required: {
            value: true,
            errorMessage: 'Наименование обязательное поле',
        },
        minLength: {
            value: 3,
            errorMessage: `Наименование имеет минимум ${this.value} символов`
        },
    },
}

const updateTeamSchema = {
    name: {
        minLength: {
            value: 3,
            errorMessage: `Наименование имеет минимум ${this.value} символов`
        },
    },
}

module.exports = {
    createTeamSchema,
    updateTeamSchema
}