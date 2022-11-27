import React from "react";
import { Comment, Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Comment
            </Button>
        </Form.Item>
    </>
);

const user = JSON.parse(localStorage.getItem('user'));
const avatarUrl = user && `https://avatar.oxro.io/avatar.svg?name=${user.username.toUpperCase()}&background=6ab04c&color=000`;

class Comments extends React.Component {

    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const newComment = {
            author: user.username,
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
        };

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    newComment,
                ],
            });

            this.props.content(newComment.content);
        }, 1000);

    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };


    render() {
        const { comments, submitting, value } = this.state;

        return (
            <>
                <Comment
                    avatar={<Avatar src={avatarUrl ? avatarUrl : "https://joeschmoe.io/api/v1/random"}/>}
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}

export default Comments;