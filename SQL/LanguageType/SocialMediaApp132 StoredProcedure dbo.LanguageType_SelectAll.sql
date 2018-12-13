USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[LanguageType_SelectAll]    Script Date: 9/11/2018 9:56:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Select all language types>

-- Modified By: Jennifer Truong
-- implement delete on ids not attached to FK
-- =============================================
ALTER PROCEDURE [dbo].[LanguageType_SelectAll]
	-- Add the parameters for the stored procedure here
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[LanguageType_SelectAll]

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select distinct
	lt.Id,
	lt.TypeName,
	lt.TypeDescription,
	CAST(case 
		when ud.id is null and ud2.id is null then 1
		else 0
	end as bit) as canDelete

from LanguageType lt
left join UserDemographic ud on ud.PrimaryLanguageTypeId=lt.Id
left join UserDemographic ud2 on ud2.SecondLanguageTypeId=lt.Id

END
