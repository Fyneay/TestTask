
const createPersonSchema = {
    lastname: {
        required: {
            value: true,
            errorMessage: 'Фамилия обязательное поле',
        },
        minLength: {
            value: 3,
            errorMessage: `Фамилия имеет минимум ${this.value} символов`
        },
    },
    middlename: {
        required: {
            value: false
        },
        isString: {
            value: true,
            errorMessage: 'Отчество должно иметь только строковые символы',
        },
    },
    firstname: {
        required: {
            value: true,
            errorMessage: 'Имя обязательное поле',
        },
        isString: {
            value: true,
            errorMessage: 'Имя должно иметь только строковые символы',
        },
        minLength: {
            value: 1,
            errorMessage: `Имя имеет минимум ${this.value} символов`
        },
    },
    birthday: {
        required: {
            value: true,
            errorMessage: 'День рождения обязательное поле',
        },
        isDateFormat: {
            value: true,
            errorMessage: 'Поле должно иметь корректный формат ГГГГ-ММ-ДД'
        }
    },
    team_id: {
        required: {
            value: true,
            errorMessage: 'Команда обязательное поле',
        },
    }
}

const updatePersonSchema = {
    lastname: {
        minLength: {
            value: 3,
            errorMessage: `Фамилия имеет минимум ${this.value} символов`
        },
    },
    middlename: {
        isString: {
            value: true,
            errorMessage: 'Отчество должно иметь только строковые символы',
        },
    },
    firstname: {
        isString: {
            value: true,
            errorMessage: 'Имя должно иметь только строковые символы',
        },
        minLength: {
            value: 1,
            errorMessage: `Имя имеет минимум ${this.value} символов`
        },
    },
    birthday: {
        isDateFormat: {
            value: true,
            errorMessage: 'Поле должно иметь корректный формат ГГГГ-ММ-ДД'
        }
    },
    team_id: {
        required: {
            value: false,
            errorMessage: 'Команда обязательное поле',
        },
    }
}

module.exports = {
    createPersonSchema,
    updatePersonSchema
};