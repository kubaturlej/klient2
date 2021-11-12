export interface User {
    email:      string;
    nickName:   string;
    token:      string;
}

export interface UserLoginFormValues {
    email:      string;
    password:   string;
}

export interface UserRegisterFormValues {
    email:              string;
    password:           string;
    nickname:           string;
    confirmPassword:    string;
    nationality:        string;
    dateOfBirth:        string;
}