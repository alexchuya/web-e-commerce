import React from 'react'
import { Pagination, PageItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'

function Paginate({pages, page, keyword='', isAdmin = false}) {

    const navigate = useNavigate

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
  
    console.log('KEYWORD:',keyword)


  
    return (  pages > 1 && (
    <Pagination>

        {[...Array(pages).keys()].map((x) => (   
      
            <PageItem key = {x+1} active={x+1 === page} 
                href={!isAdmin ? 
                    `/?keyword=${keyword}&page=${x+1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x+1}`   
                } 
            >
                {x+1}
            </PageItem>
  
           
        ))}
    </Pagination>

  ))}

export default Paginate

