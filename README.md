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