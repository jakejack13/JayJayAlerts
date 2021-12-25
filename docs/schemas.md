# Schemas

## Alerts Schema

### Chat Request
Request path: `/chat`
Full request: `http://$ADD_CLIENTBACKHOSTNAME:$ADD_CLIENTBACKPORT$AL_CHAT?channel={channel}&username={username}&message={message}`

### Follow Request
Request path: `/follow`
Full request: `http://$ADD_CLIENTBACKHOSTNAME:$ADD_CLIENTBACKPORT$AL_FOLLOW?channel={channel}&username={username}`

### Subscription Request
Request path: `/sub`
Full request: `http://$ADD_CLIENTBACKHOSTNAME:$ADD_CLIENTBACKPORT$AL_SUBSCRIPTION?channel={channel}&username={username}`


## Database Schema

### Get Request
Request path: `/get`
Full request: `http://$ADD_DATABASEHOSTNAME:$ADD_DATABASEPORT$DB_GET?channel={channel}&field={field}`

### Set Request
Request path: `/set`
Full request: `http://$ADD_DATABASEHOSTNAME:$ADD_DATABASEPORT$DB_SET?channel={channel}&field={field}&value={value}`

### Is Request
Request path: `/is`
Full request: `http://$ADD_DATABASEHOSTNAME:$ADD_DATABASEPORT$DB_IS?channel={channel}&field={field}&value={value}`

### Add Request
Request path: `/add`
Full request: `http://ADD_DATABASEHOSTNAME:$ADD_DATABASEPORT$DB_ADD?{key}={value}&...`

### Field Request
Request path: `/field`
Full request: `http://$ADD_DATABASEHOSTNAME:$ADD_DATABASEPORT$DB_FIELD?field={field}`
