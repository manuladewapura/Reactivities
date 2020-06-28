import React, { useState, FormEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import {observer} from 'mobx-react-lite';

interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
    activity: initialFormActivity,
}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, cancelFormOpen} = activityStore;

    const initializeForm = () => {
        if (initialFormActivity) {
            return initialFormActivity;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: '',
            }
        }

    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const submitHandler = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }

    const inputChangeHandler = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler}>
                <Form.Input
                    onChange={inputChangeHandler}
                    name='title'
                    placeholder='Title'
                    value={activity.title} />
                <Form.TextArea
                    onChange={inputChangeHandler}
                    name='description'
                    rows={2}
                    placeholder='Description'
                    value={activity.description} />
                <Form.Input
                    onChange={inputChangeHandler}
                    name='category'
                    placeholder='Category'
                    value={activity.category} />
                <Form.Input
                    onChange={inputChangeHandler}
                    name='date'
                    type='datetime-local'
                    placeholder='Date'
                    value={activity.date} />
                <Form.Input
                    onChange={inputChangeHandler}
                    name='city'
                    placeholder='City'
                    value={activity.city} />
                <Form.Input
                    onChange={inputChangeHandler}
                    name='venue'
                    placeholder='Venue'
                    value={activity.venue} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
