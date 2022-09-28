import gql from "graphql-tag";
import React from "react";
import { Card } from "react-bootstrap";


//returns 1 poll with relevant details
const QUERY_GET_POLL = gql`
  query {
    poll(limit: 1) {
      id
      question
      options(order_by: { id: desc }) {
        id
        text
      }
    }
  }
`;

//inserts a new vote to the database
const MUTATION_VOTE = gql`
  mutation vote($optionId: uuid!, $userId: uuid!) {
    insert_vote(
      objects: [{ option_id: $optionId, created_by_user_id: $userId }]
    ) {
      returning {
        id
      }
    }
  }
`;

//real-time data
const SUBSCRIPTION_RESULT = gql`
  subscription getResult($pollId: uuid!) {
    poll_results(
      order_by: { option_id: desc }
      where: { poll_id: { _eq: $pollId } }
    ) {
      option_id
      option {
        id
        text
      }
      votes
    }
  }
`;

//display online users
const SUBSCRIPTION_ONLINE_USERS = gql`
  subscription getOnlineUsersCount {
    online_users {
      count
    }
  }
`;

//show user is online
const MUTATION_MARK_USER_ONLINE = gql`
  mutation userOnline($uuid: uuid) {
    update_user(where: { id: { _eq: $uuid } }, _set: { online_ping: true }) {
      affected_rows
      returning {
        last_seen_at
      }
    }
  }
`;

//create new user
const MUTATION_NEW_USER = gql`
  mutation newUser($uuid: uuid) {
    insert_user(objects: [{ id: $uuid }]) {
      returning {
        id
        created_at
      }
    }
  }
`;