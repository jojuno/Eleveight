USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[LanguageType_Delete]    Script Date: 9/11/2018 9:55:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Delete a language type>
-- =============================================
ALTER PROCEDURE [dbo].[LanguageType_Delete]
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[LanguageType_Delete]
		@Id = 1

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Delete from dbo.LanguageType
	where Id = @Id
END
