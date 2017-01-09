# Visualizing_MeSH_Term_Interaction_Over_Time

# API Documentation

## HTTP GET /api/v0.1/get_terms_count

### Request JSON
```
{
    "start": 1990,
    "end": 2005,
    "terms": ["term1", "term2" ]
}
```
### Response JSON
*SUCCESS*

```
{
    "status": "SUCCUSS",
    "data": [
        {
            "key": "term 1", 
            "values": [
                {"x": 0, "y": 10}, 
                {"x": 5, "y": 20}, 
                {"x": 10, "y": 40}, 
                {"x": 30, "y": 30}
            ]
        },
        {
            "key": "term 2", 
            "values": [
                {"x": 0, "y": 10}, 
                {"x": 5, "y": 20}, 
                {"x": 10, "y": 40}, 
                {"x": 30, "y": 30}
            ]
        }
    ]
}

where x is the year and y is the term count
```


*FAIL*

```
{
    "status": "FAIL",
    "message": "Description of failure"
}
```

## HTTP GET /api/v0.1/get_word_cloud

### Request JSON
```
{
    "start": 1990,
    "end": 2005
}
```

### Response JSON
*SUCCESS*

```
{
    "status": "SUCCUSS",
    "data": [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5},
        /* ... */
    ]
}

where text is the MeSH term and weight is the term count in the year range specified above
```

*FAIL*

```
{
    "status": "FAIL",
    "message": "Description of failure"
}
```
