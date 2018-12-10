import React from 'react';
import { Row, Col } from 'reactstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Image from 'react-bootstrap/lib/Image';
import classes from './ContactPage.css';

const ContactPage = (props) => (
    <Grid >
        <Row className={classes.ContactPage}>
            <Col xs={6} md={4}>
                <Image src="https://media.licdn.com/dms/image/C5603AQH9gKSuiTI_CQ/profile-displayphoto-shrink_800_800/0?e=1550102400&v=beta&t=AxMXkLibBN8u570H8yYAtq1BPSqjoCqS5YB_Gqzq7xk" thumbnail />
                <p className={classes.email}>Email: aosun@seas.upenn.edu</p>
            </Col>
            <Col xs={6} md={4}>
                <Image src="https://media.licdn.com/dms/image/C5103AQFONp0ZE-ouxQ/profile-displayphoto-shrink_800_800/0?e=1550102400&v=beta&t=b0sivY3mIWLHisVJLwiyoczChxXTFj46w0Kik0xe86o" thumbnail />
                <p className={classes.email}>Email: wangyi17@seas.upenn.edu</p>
            </Col>
        </Row>
    
        <Row className={classes.ContactPage}>
            <Col xs={6} md={4}>
                <Image src="https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/34813370_1870566343008004_6245273277523034112_n.jpg?_nc_cat=107&_nc_ht=scontent-iad3-1.xx&oh=ae08051a6f673398725f0c18156f1ede&oe=5C98A8BA" thumbnail />
                <p className={classes.email}>Email: jiaywang@seas.upenn.edu</p>
            </Col>
            <Col xs={6} md={4}>
                <Image src="https://media.licdn.com/dms/image/C5603AQGF6xRaFLkbdw/profile-displayphoto-shrink_800_800/0?e=1550102400&v=beta&t=20zt6OG9EdFjsXw41BkWjvtlWe3oCbb7cJQ4Q6VYgWg" thumbnail />
                <p className={classes.email}>Email: yufanc@seas.upenn.edu</p>
            </Col>

        </Row>

    </Grid>
    
);

export default ContactPage;